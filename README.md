# Simple Programme

A project template for [Middleman](http://middlemanapp.com) to generate programmes for simple conventions and conferences.

This template can be used to generate a single page web application for simple conventions and conference programmes that only have one or two parallel streams.

## Features

#### Static Web Page
The final product is a static web page, so can be hosted very cheaply on static file hosting sites such as [Amazon S3](https://aws.amazon.com/s3/).

#### Offline
After being loaded once, the web application can be viewed offline without an internet connection.

#### Homescreen Application
The web application can be added to the homescreen on iOS, Andriod and Windows Phone.

#### Bookmark Programme Items
Users can bookmark programme items so they can see what is coming up that they would like to attend.

#### Updatable
The programme can be updated after people have loaded it, so long as they have an internet connection. It will remember what items they have bookmarked.

## Usage

1. [Install Middleman](https://middlemanapp.com/basics/install/)
2. `bundle exec middleman init projectname --template=aJanuary/simple-programme`
3. Edit `data/programme.yaml`
4. `bundle exec middleman build`

The generated files will be in the `build` directory.

## `programme.yaml`

The `data/programme.yaml` file contains the data for the programme.

### Example

```yaml
name: "Example Con"
days:
  - date: 2017-04-05
    items:
      - id: "early"
        name: "Early item"
        start: "08:00"
        start_label: "early"
        end: "12:00"
        room: "Room 1"
      - id: "late"
        name: "Late item"
        start: "12:00"
        end: "23:00"
        end_label: "late"
        room: "Room 2"
  - date: 2017-04-06
    items:
      - name: "Dinner"
        start: "12:00"
        end: "13:00"
      
```

### Fields

| Field       | Description | Required |
| ----------- | ----------- | -------- |
| name        | Name of the con. | Yes |
| days        | List of the days in the con. | Yes |
| date        | Date of the day in the format `yyyy-mm-dd`. | Yes |
| items       | List of items in the day. | Yes |
| id          | Identifier for the item.<br>If present, will allow the item to be bookmarked. So long as the id is the same, an item will remember it's bookmark status even if any of the other details change. | No |
| name        | Name of the item.<br>On small screens this may be truncated, so put critical information near the beginning. | Yes |
| start       | Start time of the event in the format `24hh:mm`. | Yes |
| start_label | Freeform text to display as the start time. If not present, the `start` field will be used instead. | No |
| end         | End time of the event in the format `24hh:mm`. Must be after the `start` field. | Yes |
| end_label   | Freeform text to display as the end time. If not present, the `end` field will be used instead. | No |
| room        | The room the item will be in. | No |