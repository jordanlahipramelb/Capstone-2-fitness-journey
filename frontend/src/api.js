import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class containing methods used to communicate with the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FitnessJourney {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FitnessJourney.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /*************** Start User/Auth Routes *******************/

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /*************** End User/Auth Routes ***************************/

  /************ Start Post Routes *************************/

  /** Get all posts (filtered by date if not undefined) */

  static async getPosts(date) {
    let res = await this.request("forum", { date });
    return res.posts;
  }

  /** Get a single posts including its comments */

  static async getPost(id) {
    let res = await this.request(`forum/${id}`);
    return res.post;
  }

  /************ End Post Routes *************************/

  /*********** Start Exercise Routes ************************/

  /** Get exercises (filtered by name if not undefined) */

  static async getExercises(name) {
    let res = await this.request("exercises", { name });
    return res.exercises;
  }

  /** Get details on a exercise by name. */

  static async getExercise(id) {
    let res = await this.request(`exercises/${id}`);
    return res.exercise;
  }

  /************ End Exercise Routes******************************/
}

export default FitnessJourney;
