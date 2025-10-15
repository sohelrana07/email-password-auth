import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    const name = event.target.name.value;
    const photo = event.target.photo.value;

    console.log(email, password, terms, name, photo);

    // const length6Pattern = /^.{6,}$/;
    // const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    // const specialCharPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    // if (!length6Pattern.test(password)) {
    //   console.log("password didnt match");
    //   setError("Password must be 6 character or longer");
    //   return;
    // } else if (!casePattern.test(password)) {
    //   setError(
    //     "Password must have at least one uppercase and one lower case character"
    //   );
    //   return;
    // } else if (!specialCharPattern.test(password)) {
    //   setError(
    //     "Password must contain at least one special character (e.g. ! @ # $ % ^ & *)."
    //   );
    //   return;
    // }

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters long and include one uppercase, one lowercase, and one special character."
      );
    }

    // reset : success or error
    setError("");
    setSuccess(false);

    if (!terms) {
      setError("Accept our terms and conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        event.target.reset();
        // update user profile
        const profile = {
          displayName: name,
          photoURL: photo,
        };

        updateProfile(result.user, profile)
          .then(() => {
            console.log("updated done");
          })
          .catch((error) => console.log(error.message));

        // send verification email
        sendEmailVerification(result.user).then(() => {
          alert("Please login to your email and verify your email address");
        });
      })
      .catch((error) => {
        console.log("error happened", error.message), setError(error.message);
      });
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="card bg-base-100 w-full m-auto my-20 max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Register now!</h1>
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            {/* User name */}
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Your Name"
            />

            {/* User photo url */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input"
              placeholder="Photo URL"
            />

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password"
              />
              <button
                onClick={handleTogglePasswordShow}
                className="cursor-pointer absolute top-[50%] -translate-y-[50%] right-7"
              >
                {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </button>
            </div>
            <div>
              <label className="label">
                <input name="terms" type="checkbox" className="checkbox" />
                Accept our terms and condition
              </label>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          {success && (
            <p className="text-green-500">Account created successfully.</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <p>
          Already have an account?{" "}
          <Link className="text-blue-500 underline font-semibold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
