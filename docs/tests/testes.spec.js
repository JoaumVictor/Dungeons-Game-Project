/* eslint-disable import/extensions */
// const fetch = require('node-fetch');
import fetch from 'node-fetch';

jest.mock('node-fetch');
const {Response} = jest.requireActual('node-fetch');

const getChar = async (classe) => {
  try {
    const response = await fetch(`https://api.open5e.com/classes/${classe}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const getOponents = async () => {
  try {
    const response = await fetch('https://api.open5e.com/classes')
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

describe('Testa getChar', () => {
  it('Verifica se getChar é uma função', () => {
    expect.assertions(1);
    expect(typeof getChar).toBe('function');
  });
  it('Verifica ao chamar getChar fetch é executado', async () => {
    expect.assertions(2);
    const url = 'https://api.open5e.com/classes/Bard';
    await getChar('Bard');
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(url);
  });
});

describe('Testa getOponents', () => {
  it('Verifica se getOponents é uma função', () => {
    expect.assertions(1);
    expect(typeof getOponents).toBe('function');
  });
  it('Verifica ao chamar getOponents fetch é executado', async () => {
    expect.assertions(2);
    const url = 'https://api.open5e.com/classes';
    await getOponents();
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(url);
  });
});
