import OffsetBaseSlot from "./OffsetBaseSlot";

class MonthSlot extends OffsetBaseSlot {
  constructor() {
    // Months are from 1 to 12 inclusive, so maximumValue is 13 to accommodate the offset
    super(13);
  }
}

export default MonthSlot;
