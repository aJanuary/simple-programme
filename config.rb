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

  def day_for(date)
    Date::DAYNAMES[date.wday]
  end

  def start_date(day, item)
    date = day.date
    start_time = Time.parse(item.start)
    DateTime.new(date.year, date.month, date.day, start_time.hour, start_time.min).to_s
  end

  def end_date(day, item)
    date = day.date
    start_time = Time.parse(item.start)
    end_time = Time.parse(item.end)
    if (start_time > end_time)
      date += 1
    end
    DateTime.new(date.year, date.month, date.day, end_time.hour, end_time.min).to_s
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
