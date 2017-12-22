import EventManager from '../event/eventManager';

class Modal {

  constructor(obj) {
    this.stateChangeMessages = obj.attr('data-stateChangeMessages');
    this.onShowMessagePerformer = obj.attr('data-onShowMessagePerformer');
    this.onHideMessagePerformer = obj.attr('data-onHideMessagePerformer');
    this.onShowMessagesTransmitter = obj.attr('data-onShowMessagesTransmitter');
    this.onHideMessageTransmitter = obj.attr('data-onHideMessageTransmitter');
    this.modal = obj;
    this.init();
  }

  init() {
    let current = this;

    // show
    if (current.onShowMessagePerformer.length) {
      $.each(current.onShowMessagePerformer.split("|"), function(index, value) {
        EventManager.subscribe(value, current.show, current);
      });
    }

    // hide
    if (current.onHideMessagePerformer.length) {
      $.each(current.onHideMessagePerformer.split("|"), function(index, value) {
        EventManager.subscribe(value, current.hide, current);
      });
    }

    //current.modal.on('hidden.bs.modal', current.doHide);
    //current.modal.on('shown.bs.modal', current.doShow);
  }

  show() {
    this.modal.modal("show");
    this.notifyOnShow();
  }

  hide() {
    this.modal.modal("hide");
    this.notifyOnHide();
  }

  notifyOnShow() {
    let current = this;
    let modal = current.modal;
    if (current.onShowMessagesTransmitter.length) {
      $.each(current.onShowMessagesTransmitter.split("|"), function(index, value) {
        EventManager.trigger(value, modal);
      });
    }
  }

  notifyOnHide() {
    let current = this;
    let modal = current.modal;
    if (current.onHideMessageTransmitter.length) {
      $.each(current.onHideMessageTransmitter.split("|"), function(index, ev) {
        EventManager.trigger(ev, modal);
      });
    }
  }

}

$(document).ready(function() {
  let modal = $('.score-modal');
  if (modal.length) {
    modal.each(function() {
      new Modal($(this));
    });
  }
});
