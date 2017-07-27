export default (stateChangeObject) => {
  console.log('------------');
  Object.keys(stateChangeObject).forEach(
    change => console.log(`Changing ${change} to:`, stateChangeObject[change])
  )
  console.log('------------');
  console.log('****');
};
