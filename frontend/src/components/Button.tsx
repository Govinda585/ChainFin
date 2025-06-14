type btnProps = {
  btnName: string;
  fun?: () => Promise<void>;
  type?: "button" | "submit" | "reset";
};
const Button = ({ btnName, type, fun }: btnProps) => {
  return (
    <button
      onClick={fun}
      type={type}
      className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
    >
      {btnName}
    </button>
  );
};

export default Button;
