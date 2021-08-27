/**
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.field
 * @param {string} props.placeholder
 * @param {boolean} [props.required]
 */
const TextField = ({ label, field, placeholder, required, onFieldChange }) => {
  return (
    <>
      <div className="flex flex-col w-full">
        {label && (
          <label for={field} className="text-xs font-light ml-1">
            {label}
          </label>
        )}

        <input
          className="p-2 rounded-lg text-gray-900 w-full"
          type="time"
          name={field}
          id={field}
          placeholder={placeholder}
          required={required}
          onChange={onFieldChange}
          pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
        />
      </div>
    </>
  );
};

export default TextField;
