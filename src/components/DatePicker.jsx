import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/DatePicker.css";
import { ko } from 'date-fns/esm/locale';

const CustomDatePicker = (props) => {
  const CustomInput = forwardRef((props, ref) => (
    <button className="datepicker-input" onClick={props.onClick} ref={ref}>
      {props.value}
    </button>
  ));

  return (
    <div>
      <DatePicker
        selected={props.selectedDate}
        onChange={props.setSelectedDate}
        customInput={<CustomInput />}
        showPopperArrow={false}
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        minDate={props.minDate}
      />
    </div>
  );
};

export default CustomDatePicker;