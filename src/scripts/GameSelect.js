const getChar = async (classe) => {
  const response = await fetch(`https://api.open5e.com/classes/${classe}`);
  const data = await response.json();
  console.log(data)
  return data;
};

getChar('ranger')