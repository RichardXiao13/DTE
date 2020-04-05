import {
  firebaseConfig as FirebaseKeys,
  googleConfig as GoogleKeys,
} from "./config";
import * as Google from "expo-google-app-auth";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import firebase from "firebase";
import "firebase/firestore";

class Fire {
  constructor() {
    firebase.initializeApp(FirebaseKeys);
  }

  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync(GoogleKeys);

      if (result.type === "success") {
        try {
          const { idToken, accessToken } = result;
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await firebase.auth().signInWithCredential(credential);
          const userRef = this.firestore.collection("users").doc(this.uid);

          userRef.set({
            email: result.user.email,
            name: result.user.name,
            admin: false,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        return { cancelled: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  getUser = async () => {
    const user = await this.firestore.collection("users").doc(this.uid).get();
    return user.data();
  };

  setAvailability = (eventId, available) => {
    return this.firestore
      .collection("schedule")
      .doc(eventId)
      .collection("availability")
      .doc(this.uid)
      .set({ available });
  };

  addAnnouncement = ({ title, content, timestamp, name }) => {
    return this.firestore.collection("announcements").doc().set({
      title,
      content,
      timestamp,
      name,
    });
  };

  deleteAnnouncement = (announcementId) => {
    return this.firestore
      .collection("announcements")
      .doc(announcementId)
      .delete();
  };

  addEvent = ({ event, description, date }) => {
    return this.firestore.collection("schedule").doc().set({
      event,
      description,
      date,
    });
  };

  deleteEvent = async (eventId) => {
    const users = await this.firestore.collection("users").get();
    users.docs.forEach((doc) => {
      this.firestore
        .collection("users")
        .doc(doc.id)
        .collection("personalSchedule")
        .doc(eventId)
        .delete();
    });
    return this.firestore.collection("schedule").doc(eventId).delete();
  };

  signUp = (eventId) => {
    const user = this.uid;

    this.firestore
      .collection("users")
      .doc(user)
      .collection("personalSchedule")
      .doc(eventId)
      .set({ available: true });

    this.firestore
      .collection("schedule")
      .doc(eventId)
      .collection("availability")
      .doc(user)
      .set({ available: true });
  };

  cancelSignUp = async (eventId) => {
    const user = this.uid;

    const prom1 = this.firestore
      .collection("users")
      .doc(user)
      .collection("personalSchedule")
      .doc(eventId)
      .delete();

    const prom2 = this.firestore
      .collection("schedule")
      .doc(eventId)
      .collection("availability")
      .doc(user)
      .delete();

    await Promise.all([prom1, prom2]);
  };

  personalSchedule = async () => {
    let schedule = await this.firestore
      .collection("users")
      .doc(this.uid)
      .collection("personalSchedule")
      .get();

    schedule = schedule.docs.map((doc) => doc.id);

    schedule = schedule.map(async (id) => {
      const event = await this.firestore.collection("schedule").doc(id).get();
      return { ...event.data(), id };
    });

    schedule = await Promise.all(schedule);
    return schedule;
  };

  getAttendence = async (eventId) => {
    let attendence = await this.firestore
      .collection("schedule")
      .doc(eventId)
      .collection("availability")
      .get();

    attendence = attendence.docs.map((doc) => doc.id);

    attendence = attendence.map(async (id) => {
      const person = await this.firestore.collection("users").doc(id).get();
      return { ...person.data(), id };
    });

    attendence = await Promise.all(attendence);
    return attendence;
  };

  addAdmin = (user) => {
    this.firestore.collection("users").doc(user).update({ admin: true });
  };

  removeAdmin = (user) => {
    this.firestore.collection("users").doc(user).update({ admin: false });
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
