import { ValidationsText } from "../../elements/ValidationsText";
import { SelectContainer, SelectInput } from "./styles";

type Props = {
  label: string;
  name: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement> | undefined;
  value: string;
  required?: boolean;
  disabled?: boolean;
  options: {
    label: string;
    value: string;
  }[];
};

const Select = ({
  label,
  value,
  name,
  handleChange,
  required = false,
  options,
  disabled = false,
  onBlur = () => {},
}: Props) => {
  return (
    <SelectContainer>
      <label>
        {label}
        <SelectInput
          value={value}
          onChange={handleChange}
          name={name}
          required={required}
          disabled={disabled}
          onBlur={onBlur}
        >
          {options.map((opt, index) => {
            return (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </SelectInput>
      </label>
    </SelectContainer>
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

Select.Validations = Validations;

export default Select;
