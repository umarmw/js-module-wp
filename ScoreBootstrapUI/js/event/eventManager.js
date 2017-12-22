String.prototype.supplant = function(o) {
  return this.replace(
    /{([^{}]*)}/g,
    function(a, b) {
      var r = o[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};

function logRegistration(event, func) {
  console.info("REGISTER event {ev} to callback function {func}.".supplant({
    ev: String(event),
    func: func.name || "Anonymous Function"
  }));
}

function logUnsubscription(event, func) {
  console.info("UNSUBSCRIBE function {func} from event {ev}.".supplant({
    ev: String(event),
    func: func.name || "Anonymous Function"
  }));
}

function logHandledTrigger(subscriber, event) {
  console.log("CALL function {func} with event {ev}.".supplant({
    func: subscriber.callback.name,
    ev: String(subscriber.event)
  }));
  //console.dir(event);
}

function logMissedTrigger(event) {
  console.info("SKIP event {ev}, event has no subscriptions.".supplant({
    ev: String(event)
  }));
}

function Registration(event, callback, thisp) {
  Object.defineProperties(this, {
    id: {
      value: String((new Date()).valueOf())
    },
    event: {
      value: event
    },
    callback: {
      value: callback
    },
    thisp: {
      value: thisp
    }
  });
}

class EventManager {

  constructor() {
    this.subscribers = [];
    this.loadingDeferred = $.Deferred();
  }

  pauseTriggers() {
    this.loadingDeferred.resolve();
    this.loadingDeferred = $.Deferred();
    return this;
  }

  registrationComplete() {
    this.loadingDeferred.resolve();
    return this;
  }

  executeCallbacks(arg, args) {
    var event = args.splice(0, 1)[0],
      counter = 0;
    this.subscribers.forEach(function(subscriber) {
      if (event === subscriber.event) {
        counter++;
        logHandledTrigger(subscriber, event);
        if (args.length <= 1) {
          if (subscriber.thisp === undefined) {
            subscriber.callback(args[0]);
          } else {
            subscriber.callback.call(subscriber.thisp, args[0]);
          }
        } else {
          subscriber.callback.apply(subscriber.thisp || null, args);
        }
      }
    });

    if (counter === 0) {
      logMissedTrigger(event);
    }
  }

  trigger(event) {
    let self = this;
    if (!event) {
      console.Error("Argument 'event' is required for method EventManager.trigger");
      return null;
    }
    return self.loadingDeferred.promise().done(self.executeCallbacks(null, $.makeArray(arguments)));
  }

  subscribe(event, callback, thisp) {
    var registration;

    if (!event || typeof callback !== "function") {
      console.info(
        "Skipping event registration. EventManager can only accept " +
        "registrations that specify an event and a callback function."
      );
      return null;
    }

    logRegistration(event, callback);
    registration = new Registration(event, callback, thisp);
    this.subscribers.push(registration);
    return registration.id;
  }

  unsubscribe(registrationId) {
    var i = _.findIndex(this.subscribers, function(registration) {
      return registration.id === registrationId;
    });

    if (i === -1) return;
    logUnsubscription(this.subscribers[i].event, this.subscribers[i].callback);
    this.subscribers.splice(i, 1);
  }
}

let eventManager = new EventManager();
export default eventManager;
