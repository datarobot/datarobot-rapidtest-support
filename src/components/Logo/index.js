import React from 'react';

const Logo = ({ color = '#fff', ...rest }) => (
  <svg
    width={139}
    height={33}
    viewBox="0 0 139 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M61.188.042c-1.024.155-2.002.761-2.535 1.57-.377.573-.49.968-.496 1.717-.004.626.004.667.18 1.03.324.663.944 1.139 1.687 1.294.473.1 1.584.04 1.995-.108 1.638-.588 2.646-2.08 2.407-3.566-.118-.737-.56-1.362-1.19-1.684-.505-.258-1.338-.36-2.048-.253zm18.294 1.92c0 .028-.304 1.78-.675 3.895l-.689 3.924c-.007.044-.124-.093-.26-.305-.615-.959-1.679-1.686-2.957-2.022-.448-.117-.633-.132-1.63-.133-1.568 0-2.286.167-3.653.849-2.817 1.406-4.88 4.45-5.454 8.044-.202 1.272-.2 2.824.008 3.847.487 2.41 2.089 4.195 4.283 4.773.681.18 2.035.243 2.839.133 1.58-.216 3.028-.959 4.184-2.144.224-.23.407-.402.407-.384 0 .02-.089.54-.197 1.16-.108.618-.196 1.14-.196 1.16 0 .02 1.182.037 2.627.036h2.627l1.986-11.343a3564.735 3564.735 0 012.014-11.441c.025-.094-.126-.1-2.619-.1-1.529 0-2.645.022-2.645.051zm9.386 1.763c0 .066-.658 3.867-.703 4.062-.03.125-.041.127-1.194.142l-1.165.015-.122.651c-.067.359-.138.76-.159.893l-.036.24h1.155c.636 0 1.156.017 1.156.037 0 .02-.42 2.422-.933 5.338-.513 2.917-.957 5.558-.987 5.87-.146 1.512.207 2.59 1.04 3.168.732.508 1.533.654 3.59.654h1.447l.03-.127c.046-.197.31-1.637.31-1.692 0-.027-.576-.05-1.28-.05-1.675-.002-2.133-.095-2.584-.526-.28-.267-.382-.64-.37-1.343.008-.49.177-1.537.957-5.947l.946-5.353 2.314-.015c2.141-.014 2.315-.022 2.343-.113.025-.086.314-1.643.314-1.694 0-.01-1.036-.02-2.304-.02-1.662 0-2.304-.017-2.304-.063 0-.06.653-3.882.698-4.085.02-.092-.059-.1-1.069-.1-.705 0-1.09.02-1.09.058zm44.062 0c0 .066-.658 3.867-.703 4.062-.029.125-.041.127-1.194.142l-1.164.015-.122.651c-.067.359-.139.76-.159.893l-.037.24h1.156c.635 0 1.155.017 1.155.037 0 .02-.419 2.422-.932 5.338-.513 2.917-.957 5.558-.987 5.87-.147 1.512.206 2.59 1.039 3.168.732.508 1.534.654 3.591.654h1.446l.03-.127c.046-.197.309-1.637.309-1.692 0-.027-.575-.05-1.278-.05-1.676-.002-2.134-.095-2.584-.526-.28-.267-.383-.64-.371-1.343.009-.49.177-1.537.957-5.947l.947-5.353 2.313-.015c2.142-.014 2.316-.022 2.343-.113.025-.086.315-1.643.315-1.694 0-.01-1.037-.02-2.304-.02-1.663 0-2.305-.017-2.305-.063 0-.06.653-3.882.699-4.085.02-.092-.06-.1-1.069-.1-.706 0-1.091.02-1.091.058zM21.228 7.385c-3.565.644-6.445 3.573-7.507 7.635-.402 1.537-.516 3.495-.283 4.848.415 2.406 1.802 4.126 3.912 4.853.611.21 1.259.301 2.134.301 1.29 0 2.254-.214 3.299-.734.789-.392 1.297-.751 1.912-1.35.299-.292.533-.484.52-.427-.044.198-.418 2.204-.418 2.244 0 .022 1.183.04 2.628.04h2.627L31.56 16.2c.829-4.728 1.506-8.615 1.504-8.638-.004-.037-5.227-.066-5.233-.029l-.213 1.194-.21 1.179-.265-.421c-.322-.512-.96-1.135-1.484-1.45-.5-.299-1.186-.55-1.797-.657-.61-.108-2.023-.104-2.633.006zm25.376-.066c-.047.011-.274.051-.506.089-1.298.212-2.727.96-3.767 1.97-.278.27-.505.47-.505.443 0-.026.09-.542.197-1.144.108-.603.197-1.11.197-1.127 0-.017-1.183-.03-2.628-.03h-2.628l-2.222 12.73-2.223 12.73 2.611.016c1.436.008 2.621.005 2.633-.007.012-.012.434-2.371.94-5.243.505-2.872.931-5.234.947-5.25.015-.015.091.082.17.217.568.978 1.757 1.838 2.962 2.142.35.089.726.129 1.408.151 1.522.05 2.512-.165 3.847-.832 2.926-1.462 4.986-4.535 5.564-8.3.22-1.44.154-3.113-.17-4.254-.488-1.72-1.62-3.084-3.15-3.797-.8-.372-1.373-.486-2.553-.506-.572-.01-1.078-.009-1.124.002zm-33.806.07c-.093.014-.36.072-.595.13-1.38.34-2.661 1.14-3.861 2.406-.316.333-.574.577-.574.542 0-.034.114-.698.253-1.475.14-.777.253-1.426.253-1.443 0-.016-1.183-.03-2.628-.03H3.018l-1.48 8.511C.724 20.71.045 24.598.03 24.668L0 24.796h5.271l.718-4.093c.395-2.25.78-4.335.857-4.63.332-1.287.955-2.146 1.885-2.599.79-.385 1.233-.468 2.716-.51l1.29-.035.457-2.606c.25-1.433.472-2.688.492-2.79l.037-.184-.378.009a6.512 6.512 0 00-.547.032zm43.537 8.641c-.814 4.68-1.493 8.568-1.509 8.638l-.029.128h5.271l1.478-8.483c.813-4.665 1.492-8.552 1.508-8.638l.03-.156h-5.269l-1.48 8.511zm47.241-8.338c-3.384.356-6.216 2.41-7.731 5.605-.712 1.502-1.058 2.959-1.115 4.701-.05 1.521.155 2.574.717 3.682.926 1.822 2.658 2.978 4.926 3.287.767.105 2.575.042 3.304-.114 2.793-.598 5.103-2.368 6.344-4.859.143-.286.26-.534.26-.55 0-.016-.516-.03-1.147-.03h-1.147l-.206.41c-.725 1.438-2.028 2.538-3.598 3.04-.823.263-1.212.317-2.248.315-.792-.001-1.04-.023-1.446-.125a4.838 4.838 0 01-1.655-.729c-1.11-.74-1.748-1.84-1.932-3.33-.065-.526-.045-1.466.038-1.776l.034-.127H110.885l.034-.156.205-.948c.477-2.198.184-4.227-.829-5.729-.867-1.286-2.323-2.18-4.051-2.488-.604-.107-2.007-.149-2.668-.08zm16.4 0c-2.201.22-3.981 1.273-4.722 2.793-.345.708-.437 1.113-.436 1.906.002 1.084.245 1.8.861 2.538.74.886 1.764 1.451 4.381 2.417 2.401.887 3.265 1.61 3.355 2.81.1 1.341-.815 2.44-2.424 2.91-1.053.307-2.493.317-3.445.023-1.308-.403-2.041-1.29-2.134-2.584l-.034-.467h-2.062l.001.58c.001.748.11 1.261.39 1.833.654 1.338 2.185 2.27 4.135 2.518.763.097 2.534.038 3.232-.107 1.456-.304 2.58-.893 3.408-1.787.74-.798 1.052-1.632 1.051-2.81 0-1.164-.273-1.882-1.002-2.636-.695-.718-1.303-1.05-3.652-1.99-2.304-.924-2.929-1.275-3.413-1.922-.738-.985-.617-2.363.286-3.253.405-.4 1.15-.793 1.785-.943.674-.16 2.029-.145 2.628.028.978.282 1.775.88 2.131 1.597.205.413.342 1.045.306 1.419l-.021.225 1.013-.016 1.013-.015-.007-.68c-.009-.812-.106-1.233-.43-1.87-.265-.519-.912-1.216-1.473-1.586-1.181-.778-2.882-1.113-4.721-.93zM105.785 9.69c1.659.432 2.79 1.466 3.202 2.93.157.556.207 1.552.115 2.309l-.07.578H97.25l.14-.524a7.485 7.485 0 011.956-3.413c.845-.846 1.687-1.362 2.814-1.725.825-.266 1.386-.343 2.304-.317.597.018.916.057 1.321.162zm-81.746 2.277c.768.164 1.484.648 1.883 1.275.962 1.512.453 4.312-1.063 5.84-1.285 1.295-3.094 1.7-4.497 1.006-.685-.34-1.286-1.103-1.487-1.89-.329-1.289.013-3.097.808-4.277 1.002-1.488 2.786-2.287 4.356-1.954zm21.918 0c1.018.217 1.8.89 2.156 1.859.067.18.151.563.187.85.122.97-.187 2.36-.746 3.36-.302.541-1.15 1.427-1.666 1.74-1.548.941-3.322.854-4.371-.215-.406-.413-.61-.782-.76-1.368-.29-1.145-.003-2.835.681-4.009.285-.488 1.175-1.396 1.639-1.67.932-.554 1.945-.745 2.88-.547zm28.776 0c.768.164 1.484.648 1.883 1.275.963 1.512.453 4.312-1.062 5.84-1.286 1.295-3.095 1.7-4.497 1.006-.686-.34-1.287-1.103-1.488-1.89-.329-1.289.013-3.097.808-4.277 1.002-1.488 2.786-2.287 4.356-1.954z"
      fill={color}
    />
  </svg>
);

export default Logo;
