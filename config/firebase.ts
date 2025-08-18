import { initializeApp } from "firebase/app";

// Import Firebase configuration from local config file
import { firebaseConfig } from "../config.local";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
