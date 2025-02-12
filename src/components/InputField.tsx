import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register?: any;
  name?: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  hidden
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
      <label className="text-xs text-gray-400 font-medium ">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        defaultValue={defaultValue}
        {...inputProps}
        className="ring-[1.5px] ring-gray-400 font-medium p-2 rounded-md text-sm w-full"
        placeholder={`Input ${label}...`}
      />
      {error?.message &&
        <p className="text-xs text-red-400">
          {error.message.toString()}
        </p>}
    </div>
  )
}

export default InputField