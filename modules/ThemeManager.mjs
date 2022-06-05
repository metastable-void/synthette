// vim: ts=2 sw=2 et ai
/*
  ThemeManager
  Copyright (C) 2022 真空 et al.

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

export class Theme {
  constructor(options) {
    this.dark = false;
    if (options && options.dark) {
      this.dark = true;
    }
    this.values = new Map;
  }

  set(key, value) {
    this.values.set(String(key), String(value));
  }

  get(key) {
    return this.values.get(String(key));
  }
}

export class ThemeManager extends EventTarget {
  constructor() {
    super();
    this.themes = new Map;
    this.preferDark = false;
    this.selectedTheme = null;
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (e.matches) {
        this.preferDark = true;
      } else {
        this.preferDark = false;
      }
    });
  }

  addTheme(name, theme) {
    if (!(theme instanceof Theme)) {
      throw new TypeError('Not a Theme');
    }
    this.themes.set(String(name), theme);
  }

  getTheme(name) {
    return this.themes.get(String(name));
  }

  setTheme(name) {
    this.selectedTheme = this.getTheme(name);
  }

  unsetTheme() {
    this.selectedTheme = null;
  }

  getSelectedTheme() {
    if (this.selectedTheme) {
      return this.selectedTheme;
    }

    for (const theme of this.themes.entries()) {
      if (theme.dark == this.preferDark) {
        return theme;
      }
    }

    for (const theme of this.themes.entries()) {
      return theme;
    }
    throw new Error('No theme available');
  }
}
