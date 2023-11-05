import OffsetBaseSlot from "./OffsetBaseSlot";

class DaySlot extends OffsetBaseSlot {
  constructor() {
    // Days are from 1 to 31 inclusive, so maximumValue is 32 to accommodate the offset
    super(32);
  }
}

export default DaySlot;
