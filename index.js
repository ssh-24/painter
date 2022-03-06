(() => {
  ("use strict");

  const get = (element) => document.querySelector(element);
  class Painter {
    constructor() {
      this.mouseDown = false;
      this.canvas = get(".canvas");
      this.ctx = this.canvas.getContext("2d");
      this.pen = get(".js-penSize");
      this.colorPick = get(".js-colorPicker");
      this.erager = get(".js-erager");
      this.reset = get(".js-clear");
      this.size = this.pen.value;
      this.color = this.colorPick.value;

      this.events();
    }

    events() {
      this.colorPick.addEventListener(
        "change",
        (e) => (this.color = e.target.value)
      );

      this.pen.addEventListener("change", (e) => {
        this.setPen(e.target.value);
      });

      this.erager.addEventListener("click", () => this.setErager());

      this.reset.addEventListener("click", () => this.setReset());

      this.canvas.addEventListener("mousedown", (event) => {
        this.mouseDownHandler(this.canvas, event);
      });

      this.canvas.addEventListener("mousemove", (event) => {
        this.mouseMoveHandler(this.canvas, event);
      });

      this.canvas.addEventListener("mouseup", () => {
        this.mouseUpHandler();
      });
    }

    getMouse($canvas, event) {
      const paint = $canvas.getBoundingClientRect();
      return {
        x: event.clientX - paint.left,
        y: event.clientY - paint.top
      };
    }

    setPen(size) {
      const penSizeSpan = this.pen.previousElementSibling;
      penSizeSpan.innerText = `크기(${size})`;
      this.size = size;
      this.pen.value = this.size;
    }

    mouseDownHandler($canvas, event) {
      this.mouseDown = true; // 마우스 눌림 O
      const currentPosition = this.getMouse($canvas, event);
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.size;
      this.ctx.lineCap = "round"; // 선 모양 둥글게
      this.ctx.moveTo(currentPosition.x, currentPosition.y);
    }

    mouseMoveHandler($canvas, event) {
      if (!this.mouseDown) return;
      const currentPosition = this.getMouse($canvas, event);
      this.ctx.lineTo(currentPosition.x, currentPosition.y);
      this.ctx.stroke(); // 그리기
    }

    mouseUpHandler() {
      this.mouseDown = false; // 마우스 눌림 X
      this.ctx.closePath();
    }

    setErager() {
      this.color = "#ffffff";
      this.colorPick.value = this.color;
      this.ctx.strokeStyle = this.color;

      this.size = "100";
      this.pen.value = this.size;
      const penSizeSpan = this.pen.previousElementSibling;
      penSizeSpan.innerText = `크기(${this.size})`;
      this.ctx.lineWidth = this.size;
    }

    setReset() {
      this.ctx.fillStyle = "#ffffff";
      this.setPen(7);
      this.color = "#000000";
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 해당 영역 초기화
      this.colorPick.value = this.color;
    }
  }

  new Painter();
})();
