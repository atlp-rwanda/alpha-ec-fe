import { FormDataInterface } from "@/app/(Authentication)/register/page";
import { URL } from "@/utils";

type RegistrationData = Omit<FormDataInterface, 'confirmPassword'>;

export const FC_UserRegistration = async (formData: RegistrationData) => {
  try {
    const response = await fetch(`${URL}/api/users/register`, {
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
