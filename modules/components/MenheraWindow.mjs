// vim: ts=2 sw=2 et ai
/*
  BasicComponents
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


export class MenheraWindow extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        :host {
          display: grid;
        }

        #wrapper {
          display: grid;
          margin: 0;
          grid-template-rows: [viewport-start content-start] auto [content-end viewport-end];
          grid-template-columns: [viewport-start drawer-start content-start] max-content [drawer-end] 1fr [content-end viewport-end];
          transition: opacity linear .5s;
        }

        @media (min-width: 35rem) {
          #wrapper {
            grid-template-columns: [drawer-start] max-content [drawer-end content-start] 1fr [content-end];
          }

          #drawer-backdrop {
            visibility: hidden;
          }
        }

        #drawer {
          grid-row: 1 / -1;
          grid-column: drawer-start / drawer-end;
          inline-size: 80vmin;
          max-inline-size: 15rem;
          transition: all .25s ease;
          z-index: 10;
          background-color: var(--theme-input-background-color);
          box-shadow: 0 0 .5rem var(--theme-shadow-color);
          overflow: hidden;
          opacity: 1;
        }
        
        #main {
          grid-column: content-start / content-end;
          grid-row: content-start / content-end;
          display: grid;
          grid-template-rows: [header-start] max-content [header-end content-start] 1fr [content-end];
          grid-template-columns: [content-start] 1fr [content-end];
        }

        #header {
          grid-row: header-start / header-end;
          grid-column: content-start / content-end;
        }

        #content {
          grid-row: content-start / content-end;
        }

        #drawer-backdrop {
          grid-row: 1 / -1;
          grid-column: 1 / -1;
          z-index: 10;
          background-color: var(--theme-overlay-color);
          -webkit-backdrop-filter: blur(.5rem);
          backdrop-filter: blur(.5rem);
          opacity: 1;
          transition: opacity .25s ease-in;
        }

        .drawer-collapsed #drawer {
          inline-size: 0;
          opacity: 0;
        }

        .drawer-collapsed #drawer-backdrop {
          visibility: hidden;
          opacity: 0;
        }

        #drawer-menu a:hover, #drawer-menu a:active, #drawer-menu a:focus {
          background-color: var(--theme-selection-background-color);
        }

        #header {
          display: grid;
          grid-template-columns: max-content 1fr max-content;
          background-color: var(--theme-accent-color);
          color: var(--theme-highlighted-text-color);
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          inline-size: 100%;
          z-index: 1;
          grid-column: content-start / column-end;
          grid-row: header-start / header-end;
        }

        #drawer-top {
          display: grid;
          grid-template-columns: max-content 1fr;
          background-color: var(--theme-accent-color);
          color: var(--theme-highlighted-text-color);
        }

        #inactive-content {
          display: none;
        }
      </style>
      <div id='wrapper' class='drawer-collapsed'>
        <div id='main'>
          <div id='header'>
            <button id='drawer-open-button'></button>
            <div id='header-content'><slot name='header-content'></slot></div>
          </div>
          <div id='content'><slot name='content'></slot></div>
        </div>
        <div id='drawer-backdrop'></div>
        <div id='drawer'>
          <div id='drawer-top'>
            <button id='drawer-close-button'>Close</button>
            <div id='drawer-header'><slot name='drawer-header-content'></slot>/div>
          </div>
          <div id='drawer-content'><slot name='drawer-content'></slot></div>
        </div>
        <div id='inactive-content'><slot name=''></slot></div>
      </div>
    `;

    const wrapper = shadowRoot.querySelector('#wrapper');
    //wrapper.style.setProperty('');
    const drawerOpenButton = shadowRoot.querySelector('#drawer-open-button');
    drawerOpenButton.addEventListener('click', (ev) => {
      this.openDrawer();
    });
    const drawerCloseButton = shadowRoot.querySelector('#drawer-close-button');
    drawerOpenButton.addEventListener('click', (ev) => {
      this.closeDrawer();
    });
  }

  openDrawer() {
    //
    const wrapper = this.shadowRoot.querySelector('#wrapper');
    wrapper.classList.add('drawer-collapsed');
  }

  closeDrawer() {
    //
    const wrapper = this.shadowRoot.querySelector('#wrapper');
    wrapper.classList.add('drawer-collapsed');
  }
}

customElements.define('menhera-window', MenheraWindow);
