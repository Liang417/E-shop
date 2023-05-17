import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../static/data';
import { toast } from 'react-toastify';
import { createEvent, reset } from '../../redux/slice/eventSlice';

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    : '';

  const handlerStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    // The event is held for at least three days
    setStartDate(startDate);
    setEndDate(null);
  };

  const handlerEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append('images', image);
    });
    newForm.append('name', name);
    newForm.append('description', description);
    newForm.append('category', category);
    newForm.append('tags', tags);
    newForm.append('originalPrice', originalPrice);
    newForm.append('discountPrice', discountPrice);
    newForm.append('stock', stock);
    newForm.append('shop', seller._id);
    newForm.append('startDate', startDate.toISOString());
    newForm.append('endDate', endDate.toISOString());
    dispatch(createEvent(newForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success('Event created successfully');
      navigate('/shop/dashboard-events');
      dispatch(reset());
    }
  }, [dispatch, navigate, error, success]);

  return (
    <div className="w-[90%] 800px:w-[65%] bg-white  shadow h-full rounded-[4px] p-3 my-6 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
      {/* create event form */}
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            required
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your event name"
          />
        </div>

        <div className="mb-3">
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            rows="8"
            type="text"
            required
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event description"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled selected className="bg-gray-100 text-gray-400 italic">
              Choose a category
            </option>
            {categoriesData &&
              categoriesData.map((item) => (
                <option value={item.title} key={item.title}>
                  {item.title}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your event tags"
          />
        </div>

        <div className="mb-3">
          <label className="pb-2">
            Original Price ($US) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            required
            step="any"
            min="1"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product original price"
          />
        </div>

        <div className="mb-3">
          <label className="pb-2">
            Discount Price ($US) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            step="any"
            min="1"
            required
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your event product price with discount"
          />
        </div>

        <div className="mb-3">
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            min="1"
            required
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock"
          />
        </div>

        <div className="mb-3">
          <label className="pb-2">
            Event start date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate ? startDate.toISOString().slice(0, 10) : ''}
            min={new Date().toISOString().slice(0, 10)}
            required
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handlerStartDateChange}
          />
        </div>

        <div className="mb-3">
          <label className="pb-2">
            Event end date <span className="text-red-500">*</span>(at least 3 days)
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate ? endDate.toISOString().slice(0, 10) : ''}
            min={minEndDate}
            required
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handlerEndDateChange}
          />
        </div>

        <div>
          <label>
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="images"
            id="upload"
            className="flex my-3 cursor-pointer"
            required
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            {images &&
              images.map((item, index) => (
                <img
                  src={URL.createObjectURL(item)}
                  key={index}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>

          <div>
            <input
              type="submit"
              value="Create"
              className="w-full h-[35px] bg-gray-200 mt-2 cursor-pointer appearance-none text-center  border border-gray-300 rounded-[3px] sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
