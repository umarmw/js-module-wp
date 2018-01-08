import EventManager from '../event/eventManager';

class Button {

  constructor(obj) {
    this.clickMessagesTransmitting = obj.attr('data-clickMessagesTransmitting');
    this.stateChangeMessagesTransmitting = obj.attr('data-stateChangeMessagesTransmitting');
    this.showActionMessages = obj.attr('data-showActionMessages');
    this.hideActionMessages = obj.attr('data-hideActionMessages');
    this.button = obj;
    this.init();
  }

  init() {
    let current = this;

    //click events
    if (current.clickMessagesTransmitting.length) {
      current.button.on("click", function(e) {
        e.preventDefault();
        $.each(current.clickMessagesTransmitting.split("|"), function(index, value) {
          EventManager.trigger(value, current);
        });
      });
    }

    // show
    if (current.showActionMessages.length) {
      button = current.button
      $.each(current.showActionMessages.split("|"), function(index, value) {
        EventManager.subscribe(value, current.show, button);
      });
    }

    // hide
    if (current.hideActionMessages.length) {
      button = current.button
      $.each(current.hideActionMessages.split("|"), function(index, value) {
        EventManager.subscribe(value, current.hide, button);
      });
    }
  }

  show() {
    let button = this.button;
    button.show();
    if (this.stateChangeMessagesTransmitting.length) {
      $.each(this.stateChangeMessagesTransmitting.split("|"), function(index, ev) {
        EventManager.trigger(ev, button);
      });
    }
  }

  hide() {
    let button = this.button;
    button.hide();
    if (this.stateChangeMessagesTransmitting.length) {
      $.each(this.stateChangeMessagesTransmitting.split("|"), function(index, ev) {
        EventManager.trigger(ev, button);
      });
    }
  }

}

$(document).ready(function() {
  let button = $('.score-button');
  if (button.length) {
    button.each(function() {
      new Button($(this));
    });
  }
});

export default Button;