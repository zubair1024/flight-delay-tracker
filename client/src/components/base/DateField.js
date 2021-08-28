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
          <label htmlFor={field} className="text-xs font-light ml-1">
            {label}
          </label>
        )}

        <input
          className="p-2 rounded-lg text-gray-900 w-full"
          type="date"
          name={field}
          id={field}
          placeholder={placeholder}
          required={required}
          onChange={onFieldChange}
        />
      </div>
    </>
  );
};

export default TextField;
