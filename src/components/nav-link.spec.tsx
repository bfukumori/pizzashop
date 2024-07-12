import { render } from "@testing-library/react";
import { NavLink } from "./nav-link";
import { MemoryRouter } from "react-router-dom";

describe("NavLink", () => {
  it("should highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
        ),
      },
    );

    expect(wrapper.getByText("Home")).toHaveAttribute("data-current", "true");
    expect(wrapper.getByText("About")).toHaveAttribute("data-current", "false");
  });
});
