/**
 * Globals
 */

// API Constants
export const BASE_URL = "https://api.tourisfair.de/api/v1";
export const SEARCH_VERB = "/locations/search";
export const TRIPREQUEST_VERB = "/triprequests";
export const NEW_VISITOR_VERB = "/visitors/new";

/**
 * @typedef {Object} TfQueryRequest
 * @property {string} verb
 * @property {string} [parameters=""]
 * @property {Object} [options={}]
 */

/**
 *
 * @param {TfQueryRequest} query
 */
export function tfFetch(query) {
  const url = BASE_URL + query.verb + query.parameters;
  // TODO: should catch errors and check for incorrect HTTP statuses
  return fetch(url, query.options)
    .then((res) => res.json())
    .then((json) => json.data);
}

export function searchLocation(input) {
  /**
   * @type TfQueryRequest
   */
  const query = {
    verb: SEARCH_VERB,
    parameters: `?type=city&name=/^${input}/gi`,
    options: {}
  };

  return tfFetch(query);
}

export function getTrip(tripId) {
  /**
   * @type TfQueryRequest
   */
  const query = {
    verb: TRIPREQUEST_VERB + "/" + tripId,
    parameters: "",
    options: {}
  };

  return tfFetch(query);
}

/**
 * Get visitor id from server
 */
export async function requestVisitorId() {
  /**
   * @type TfQueryRequest
   */
  const query = {
    verb: NEW_VISITOR_VERB,
    parameters: "",
    options: {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        signature: "tourisfair_front_app"
      })
    }
  };
  return await tfFetch(query).then((data) => {
    console.log("Visitor ID: ", data.visitorId);
    localStorage.setItem("visitor-id", data.visitorId);
    return data.visitorId;
  });
}

export async function process(tripRequest, visitorId) {
  /**
   * @type TfQueryRequest
   */
  const query = {
    verb: TRIPREQUEST_VERB,
    parameters: "",
    options: {
      method: "POST",
      headers: {
        accept: "application/json",
        "visitor-id": visitorId,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tripRequest)
    }
  };
  return await tfFetch(query);
}
