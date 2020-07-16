import { ObjectId } from 'mongodb';

export const createEntry = (emotions, note) => {
  const entry = { _id: new ObjectId(), date: new Date().toJSON(), note };

  entry.emotions = emotions.map(({ color, data }) => ({
    _id: new ObjectId(),
    color,
    data,
  }));

  return entry;
};
