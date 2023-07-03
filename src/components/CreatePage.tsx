/**
 * ASSIGMENT:
 * 1. Create a form that allows the user to create a pokemon
 * the form should have the following fields:
 * - name
 * - type
 * - is legendary
 * - attack
 * - defense
 * - description
 * 2. Validate the form so that the user can't submit the form
 * if the name or description are empty
 * 3. Validate the form so that the user can't submit the form
 * if the attack or defense are not numbers
 * if the attack is less than 0 or greater than 100
 * if the defense is less than 0 or greater than 100
 *
 * REFERENCES:
 * input types: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 * react-hook-form: https://react-hook-form.com/get-started
 *
 */

export default function Form() {
  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <>
      <h1>Create Pokemon</h1>
      <form onSubmit={handleOnSubmit}>
        <label>Name</label>
        <input type="text" name="name" />
        <label>Type</label>
        <select name="type">
          <option value=""></option>
          <option value="electric">Electric</option>
          <option value="water">Water</option>
          <option value="fire">fire</option>
          <option value="grass">Grass</option>
          <option value="poison">Poison</option>
        </select>
        <div>
          <input type="checkbox" name="legendary" />
          <label>is Legendary</label>
        </div>
        <label>Attack</label>
        <input type="number" name="attack" />
        <label>Defense</label>
        <input type="number" name="defense" />
        <label>Description</label>
        <textarea name="description"></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
