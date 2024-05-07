type MyProps = {
  message: string;
};

export default function PageNameComponent(props: MyProps) {
  return <h1>{props.message}</h1>;
}
