class AppBar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .app-bar {
            background-color: #6200ea;
            color: white;
            padding: 1rem;
            text-align: center;
            font-size: 1.5rem;
          }
        </style>
        <div class="app-bar">Notes App</div>
      `;
    }
  }
  
  customElements.define("app-bar", AppBar);
  