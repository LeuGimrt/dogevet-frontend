import { SelectContainer, SelectInput } from "./styles";

type Props = {
  label: string;
  name: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
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

export default Select;
