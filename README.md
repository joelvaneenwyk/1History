## 1History

[![Crate](https://img.shields.io/crates/v/onehistory.svg)](https://crates.io/crates/onehistory)
[![CI](https://github.com/1History/1History/actions/workflows/CI.yml/badge.svg)](https://github.com/1History/1History/actions/workflows/CI.yml)

> All your history in one file.

1History is a command line tool to backup your different browser
histories into one file, and visualize them!

[<https://api.producthunt.com/widgets/embed-image/v1/review.svg?post_id=329191&theme=light>](https://www.producthunt.com/posts/1history?utm_source=badge-review&utm_medium=badge&utm_souce=badge-1history#discussion-body)

## Features

- Rich dashboards to visualize your history
- Export as CSV file
- Entirely offline, No need to worry about privacy leaks
- Support Chrome/Firefox/Safari on macOS/Linux/Windows
- Well-designed schemas to avoid history duplication when backup
    multiple times
- No NPM, 1History is a single binary built mainly in Rust🦀

## Screenshots

### Daily Page View

![](screenshots/daily_pv.png)

### Top 10 Title

![](screenshots/top10_title.png)

### Top 10 Domain

![](screenshots/top10_domain.png)

## Usage

``` bash
onehistory 0.1.0

USAGE:
    onehistory [OPTIONS] <SUBCOMMAND>

OPTIONS:
    -d, --db-file  <DB_FILE>           Database path [env: OH_DB_FILE=] [default: ~/onehistory.db]
    -h, --help                         Print help information
    -v, --verbose
    -V, --version                      Print version information

SUBCOMMANDS:
    backup    Backup browser history to 1History
    export
    help      Print this message or the help of the given subcommand(s)
    serve     Start HTTP server to visualize history
    show      Show default history files on your computer
```

### Backup

``` bash
USAGE:
    onehistory backup [OPTIONS]

OPTIONS:
    -d, --disable-detect
            Disable auto detect history files

    -D, --dry-run


    -f, --history-files <HISTORY_FILES>
            SQLite file path of different browsers(History.db/places.sqlite...)

    -h, --help
            Print help information
```

`backup`{.verbatim} is the main subcommand, it will import browser
history into 1History.

1History will automatically detect history of different browsers by
default, `show`{.verbatim} subcommand will show what it can find.

Users can also use `-f`{.verbatim} option to set other history files to
backup, the history file has the following naming convention:

  Browser   History Filename
  --------- ------------------
  Chrome    History
  Firefox   places.sqlite
  Safari    History.db

``` bash
## -f can be used multiple times
## -d is required when doing backup with browsers open
onehistory backup -d -f ~/some-dir/History.db -f ~/another-dir/places.sqlite
```

### Serve

After backup browser history into 1History, the next step is to
visualize those data.

`serve`{.verbatim} subcommand will start a HTTP server at
<http://127.0.0.1:9960>, open this in your browser to explore.

## Installation

### Homebrew

``` bash
brew install 1History/onehistory/onehistory
```

### Binary

The [release page](https://github.com/1History/1History/releases)
includes precompiled binaries for Linux, macOS and Windows.

### Cargo

``` bash
cargo install onehistory
```

## Changelog

See [CHANGELOG](CHANGELOG.org)

## FAQ

`Error code 5: The database file is locked`{.verbatim}

:   This error happens if your browser is opened during backup, as
    SQLite allow only one open connection.

    Close the browser is one solution, or you can copy history file to
    other directory other than default location.

## LICENSE

Copyright (c) 2022 Jiacai Liu \<<dev@liujiacai.net>\>

1History is distributed under
[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.txt) license.
