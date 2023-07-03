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
import { useForm } from "react-hook-form";

interface Inputs {
  name: string;
  description: string;
  type: string;
  legendary: boolean;
  attack: number;
  defense: number;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  console.log(errors);
  function createPokemon(data: Inputs) {
    console.log(data);
  }
  return (
    <>
      <h1>Create Pokemon</h1>
      <form onSubmit={handleSubmit(createPokemon)}>
        <label>Name</label>
        <input
          type="text"
          {...register("name", { required: "nombre es requerido" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <label>Type</label>
        <select {...register("type")}>
          <option value=""></option>
          <option value="electric">Electric</option>
          <option value="water">Water</option>
          <option value="fire">fire</option>
          <option value="grass">Grass</option>
          <option value="poison">Poison</option>
        </select>
        <div>
          <input type="checkbox" {...register("legendary")} />
          <label>is Legendary</label>
        </div>
        <label>Attack</label>
        <input type="number" {...register("attack", { min: 0, max: 100 })} />
        <label>Defense</label>
        <input type="number" {...register("defense", { min: 0, max: 100 })} />
        <label>Description</label>
        <textarea
          {...register("description", {
            required: "description es requerido",
          })}></textarea>
        {errors.description && <p>{errors.description.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
