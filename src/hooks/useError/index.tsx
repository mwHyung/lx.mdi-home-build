import { InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useState } from "react";
import { Validator } from "@/types/ui";

interface Props {
  error?: boolean;
  validate?: (value: string) => boolean;
  validator?: Validator;
  value?:
    | InputHTMLAttributes<HTMLInputElement>["value"]
    | TextareaHTMLAttributes<HTMLTextAreaElement>["value"];
}

const useError = ({ error, value, validate, validator }: Props) => {
  const [isError, setIsError] = useState(error);
  const [validatorMessage, setValidatorMessage] = useState<string>("");

  const isValidByValidator = (value: string) => {
    if (!validator) return true;
    const { type, required, maxLength, minLength, length, pattern, custom } = validator;

    if (required !== undefined) {
      if (!value) {
        setValidatorMessage(required);
        return false;
      }
    }

    if (type !== undefined) {
      switch (type) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            setValidatorMessage("이메일 형식이 올바르지 않습니다.");
            return false;
          }
          break;
        case "password":
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          if (!passwordRegex.test(value)) {
            setValidatorMessage("비밀번호 형식이 올바르지 않습니다.");
            return false;
          }
        case "number":
          const numberRegex = /^[0-9]*$|^$/;
          if (!numberRegex.test(value)) {
            setValidatorMessage("숫자만 입력해주세요.");
            return false;
          }
          break;
        case "url":
          const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/;
          if (!urlRegex.test(value)) {
            setValidatorMessage("URL 형식이 올바르지 않습니다.");
            return false;
          }
          break;
      }
    }

    if (minLength !== undefined) {
      const { value: validValue, message } = minLength;
      if (validValue < value.length) {
        setValidatorMessage(message);
        return false;
      }
    }

    if (maxLength !== undefined) {
      const { value: validValue, message } = maxLength;
      if (value.length > validValue) {
        setValidatorMessage(message);
        return false;
      }
    }

    if (length !== undefined) {
      const { value: validValue, message } = length;
      if (value.length !== validValue) {
        setValidatorMessage(message);
        return false;
      }
    }

    if (pattern !== undefined) {
      const { value: validValue, message } = pattern;
      const regex = new RegExp(validValue);
      if (!regex.test(value)) {
        setValidatorMessage(message);
        return false;
      }
    }

    if (custom !== undefined) {
      const { validator, message } = custom;
      if (!validator(value)) {
        setValidatorMessage(message);
        return false;
      }
    }

    setValidatorMessage("");
    return true;
  };

  const validateValue = (value: string) => {
    if (validate) {
      const validationFailed = !validate(value);
      return validationFailed;
    }

    if (validator) {
      const validationFailed = !isValidByValidator(value);
      return validationFailed;
    }

    return true;
  };

  useEffect(() => {
    setIsError(error);
  }, [error]);

  useEffect(() => {
    if (error && validate) {
      const validationFailed = !validate(value?.toString() || "");
      setIsError(validationFailed);
    }
  }, [error, validate, value]);

  useEffect(() => {
    if (validator) {
      const validationFailed = !isValidByValidator(value?.toString() || "");
      setIsError(validationFailed);
    } else {
      setValidatorMessage("");
    }
  }, [validator, value]);

  return { isError, setIsError, validatorMessage, validateValue };
};

export default useError;
