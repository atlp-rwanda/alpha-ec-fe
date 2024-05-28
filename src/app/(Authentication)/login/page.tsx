"use client";

import _ from "lodash";
import {
  ButtonComponent,
  ButtonStyle,
  InputElement,
} from "@/components/formElements";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { logInFields } from "@/utils/logInFormFields";
import { FC_UserLogin } from "@/services/authenticate";
import { regExPatterns, testPassword } from "@/utils";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export interface FormDataInterface {
  email: string;
  password: string;
}

export interface ErrorInterface {
  target: logInKeys;
  msg: string;
}

export type logInKeys = keyof FormDataInterface;

const InitialFormValues: FormDataInterface = {
  email: "",
  password: "",
};

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] =
    useState<FormDataInterface>(InitialFormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorInterface[]>([]);

  const handleChange = (key: logInKeys, value: string) => {
    setErrors([]);
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [key]: value };
      validateField(key, value);
      return updatedFormData;
    });
  };

  const validateField = (key: logInKeys, value: string) => {
    const newErrors = [...errors.filter((error) => error.target !== key)];
    if (key === "password") {
      const error = testPassword(value) || "";
      newErrors.push({ target: key, msg: error });
    } else if (!regExPatterns[key].test(value)) {
      const errorMsg =
        logInFields.find((field) => field.key === key)?.message ||
        "Invalid input";
      newErrors.push({ target: key, msg: errorMsg });
    }
    setErrors(newErrors);
  };

  const getErrorForField = (key: logInKeys) => {
    const error = errors.find((error) => error.target === key);
    return error ? error.msg : null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    const newErrors: ErrorInterface[] = [];

    for (const key in formData) {
      const typedKey = key as logInKeys;
      if (!regExPatterns[typedKey].test(formData[typedKey])) {
        const errorMsg =
          logInFields.find((field) => field.key === typedKey)?.message ||
          "Invalid input";
        newErrors.push({ target: typedKey, msg: errorMsg });
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const data = _.omit(formData, "confirmPassword");
    const res = await FC_UserLogin(data);
    if (res.status === "Success!") {
      setLoading(false);
      swal({
        title: "login Successfully!",
        text: "Welcome",
        icon: "success",
        timer: 2000,
      }).then(() => {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data));
        router.push("/");
      });
    }
    // else if (res.message === "A user with this email doesn't exists.") {
    //   swal({
    //     title: "logIn Failed",
    //     text: res.message,
    //     icon: "error",
    //     buttons: {
    //       confirm: false,
    //     },
    //     timer: 2000,
    //   }).then;
    //   setErrors([...errors, { target: "email", msg: res.message }]);
    //   setLoading(false);
    // }
    else {
      swal({
        title: "logIn Failed",
        text: res.message,
        icon: "error",
        buttons: {
          confirm: false,
        },
        timer: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-2/3 mx-auto flex flex-col align-middle animate__animated animate__backInLeft ">
      <div className="flex font-extrabold text-main-400 text-4xl mb-4 mx-auto">
        {" "}
        Login{" "}
      </div>
      <form
        className="flex flex-col align-middle"
        onSubmit={(e) => handleSubmit(e)}
      >
        {logInFields.map((field, i) => (
          <div
            className="w-full mt-2 flex flex-col gap-1 animate__animated animate__fadeInDown"
            key={i}
          >
            <InputElement
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              value={formData[field.key]}
              onChange={(e: { target: { value: any } }) =>
                handleChange(field.key, e.target.value)
              }
              valid={getErrorForField(field.key) ? false : true}
            />
            {getErrorForField(field.key) && (
              <span className="text-xs text-red-600 px-2 animate__animated animate__fadeInDown">
                {getErrorForField(field.key)}
              </span>
            )}
          </div>
        ))}
        <ButtonComponent
          label="Login"
          style={ButtonStyle.DARK}
          disabled={loading}
          loading={loading}
        />
      </form>
      <span className="mt-6 mx-auto text-sm text-black">
        Or create an account?{" "}
        <Link
          href="/register"
          className="text-main-400 font-bold hover:underline hover:font-extrabold"
        >
          register
        </Link>
      </span>
    </div>
  );
}
