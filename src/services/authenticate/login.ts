import { FormDataInterface } from "@/app/(Authentication)/login/page";
import { URL } from "@/utils";

export const FC_UserLogin = async (formData: FormDataInterface) => {
  try {
    const response = await fetch(`${URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (err: unknown) {
    const errors = err as Error;
    return errors.message;
  }
};
