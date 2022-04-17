import { Input, TextFieldContainer, ValidationsText } from "./styles";

type Props = {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  placeholder?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  required?: boolean;
  pattern?: string;
  disabled?: boolean;
  accept?: string;
};

const TextField = ({
  label,
  name,
  type = "text",
  value,
  handleChange,
  onBlur = () => {},
  placeholder = "",
  required = false,
  pattern,
  disabled = false,
  accept,
}: Props) => {
  return (
    <TextFieldContainer>
      <label>
        {label}
        <Input
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          disabled={disabled}
          onBlur={onBlur}
          accept={accept}
        />
      </label>
    </TextFieldContainer>
  );
};

type ValidationsProps = {
  touched: boolean | undefined;
  message: string | undefined;
};

const Validations = ({ touched, message }: ValidationsProps) => {
  if (!touched || !message) return <>&nbsp;</>;

  return <ValidationsText>⚠ {message}</ValidationsText>;
};

TextField.Validations = Validations;

export default TextField;
