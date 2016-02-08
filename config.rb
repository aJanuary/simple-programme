###
# Helpers
###

# Automatic image dimensions on image_tag helper
activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

helpers do
  require 'date'
  require 'time'
  require 'tzinfo'

  CLOCK_FORMAT = {
    '12-hour' => '%I:%M %P',
    '24-hour' => '%H:%M'
  }

  def timezone
    TZInfo::Timezone.get(data.config.timezone)
  end

  def utc(date, time)
    Time.utc(date.year, date.month, date.day, time.hour, time.min)
  end

  def to_local_time(time_utc)
    period = timezone.period_for_utc(time_utc)
    time_local = time_utc + period.utc_total_offset

    offset_hours = period.utc_total_offset / (60*60)
    offset_mins = period.utc_total_offset - (offset_hours * 60*60)
    sign = offset_hours < 0 ? '-' : '+'

    "#{time_local.strftime('%Y-%m-%dT%H:%M:%S')}#{sign}#{offset_hours.abs.to_s.rjust(2, '0')}:#{offset_mins.to_s.rjust(2, '0')}"
  end

  def day_for(date)
    Date::DAYNAMES[date.wday]
  end

  def start_date(day, item)
    date = day.date
    start_time = Time.parse(item.start + ' UTC')
    to_local_time(utc(date, start_time))
  end

  def end_date(day, item)
    date = day.date
    start_time = Time.parse(item.start + ' UTC')
    end_time = Time.parse(item.end + ' UTC')
    date += 1 if start_time > end_time
    to_local_time(utc(date, end_time))
  end

  def time_label(day, time)
    date = day.date
    time_utc = utc(date, Time.parse(time + ' UTC'))
    time_local = time_utc + timezone.period_for_utc(time_utc).utc_total_offset
    fmt = CLOCK_FORMAT[data.config.clock] || CLOCK_FORMAT['24-hour']
    time_local.strftime(fmt)
  end
end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Minify html on build
  activate :minify_html do |html|
    html.remove_intertag_spaces = true
  end

  # Enable cache buster
  activate :asset_hash

  # Generate an appcache manifest
  activate :app_cache do |config|
    config.cache_manifest = 'manifest.appcache'
    config.cache = %w(index.html stylesheets/*.css javascripts/*.js images/**/*)
    config.network = []
  end

end
