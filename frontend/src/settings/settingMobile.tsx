const rightIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

const divStyle = "w-full p-2 my-2 ms-2 bg-white rounded";
const settingsButtonStyle = "flex items-center justify-between w-full";

const SettingMobile = () => {
  return (
    <div className="container md:hidden w-full h-full p-2">
      <div className="upperSection h-1/5 flex flex-col items-center justify-end">
        <img
          src="/vite.svg"
          alt="profile pic"
          className="w-16 h-16 rounded-full my-2 bg-white"
        />
        <p>
          <small className="font-semibold">Kapil</small>
        </p>
      </div>
      <div className="lowerSection p-4">
        <h4 className="font-semibold my-4 ms-4">Account</h4>
        <div className={`username ${divStyle}`}>
          <button className={`${settingsButtonStyle}`}>
            Change Username <span>{rightIcon}</span>
          </button>
        </div>
        <div className={`username ${divStyle}`}>
          <button className={`${settingsButtonStyle}`}>
            Change Email <span>{rightIcon}</span>
          </button>
        </div>
        <div className={`username ${divStyle}`}>
          <button className={`${settingsButtonStyle}`}>
            Change Password <span>{rightIcon}</span>
          </button>
        </div>
        <h4 className="font-semibold my-4 ms-4">Help and Security</h4>
        <div className={`username ${divStyle}`}>
          <button className={`${settingsButtonStyle}`}>
            Privacy and Security <span>{rightIcon}</span>
          </button>
        </div>
        <div className={`username ${divStyle}`}>
          <button className={`${settingsButtonStyle}`}>
            Help <span>{rightIcon}</span>
          </button>
        </div>
      </div>
      <div className="logout w-full fixed bottom-0 left-0">
        <button className="w-full p-2 bg-blue-600 text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingMobile;
