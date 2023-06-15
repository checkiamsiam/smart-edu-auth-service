const generateNewID = (lastId: string | null): string => {
  const newId = (lastId || 0).toString().padStart(6, "0");
  const incrementedId = (parseInt(newId) + 1).toString().padStart(6, "0");
  return incrementedId;
};

const userUtils = {
  generateNewID,
};

export default userUtils;
