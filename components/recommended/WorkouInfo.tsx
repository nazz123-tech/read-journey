import Link from "next/link";

export const WorkoutInfo = () => {
  return (
    <div>
      <h1>Start yout workout</h1>
      <div>
        <ul>
          <li>
            Create a personal library: add the books you intend to read to it.
          </li>
          <li>
            Create your first workout: define a goal, choose a period, start
            training.
          </li>
        </ul>
          </div>
          <Link href={'/library'}>MyLibrary</Link>
    </div>
  );
};
