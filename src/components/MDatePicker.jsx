import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/MDatePicker.css";
import { ko } from 'date-fns/esm/locale';

const MDatePicker = (props) => {
  const MInput = forwardRef((props, ref) => (
    <button className="mdatepicker-input" onClick={props.onClick} ref={ref}>
    </button>
  ));

  return (
    <div>
      <DatePicker
        selected={props.selectedDate}
        onChange={props.setSelectedDate}
        customInput={<MInput />}
        showPopperArrow={false}
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        minDate={props.minDate}
        maxDate={props.maxDate}
      />
    </div>
  );
};

export default MDatePicker;