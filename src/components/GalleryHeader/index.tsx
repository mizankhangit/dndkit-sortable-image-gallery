import CheckedIcon from "../CheckedIcon";

interface PropTypes {
  selectedLength?: number | any;
  handleDelete?: any;
}

const GalleryHeader = ({ selectedLength, handleDelete }: PropTypes) => {
  return (
    <div className="flex items-center justify-between py-4 lg:py-5 px-5 md:px-8 lg:px-10 border-b">
      <div className="font-bold text-lg md:text-xl">
        {selectedLength > 0 ? (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="opacity-0 absolute w-5 h-5 cursor-pointer"
              checked
              onChange={() => false}
            />
            <CheckedIcon />
            {`${selectedLength} ${
              selectedLength > 1 ? "Files" : "File"
            } Selected`}
          </div>
        ) : (
          <h1>Gallery</h1>
        )}
      </div>
      {selectedLength > 0 ? (
        <button
          onClick={handleDelete}
          type="button"
          className="text-red-600 font-medium hover:underline underline-offset-2"
        >
          {`Delete ${selectedLength > 1 ? "files" : "file"} `}
        </button>
      ) : null}
    </div>
  );
};

export default GalleryHeader;
