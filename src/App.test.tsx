import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import fetchMock, { FetchMock } from "jest-fetch-mock";
import App from "./App.tsx";

fetchMock.enableMocks();

describe("AutocompleteApp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the auto complete", async () => {
    render(<App />);

    const title = screen.getByRole("heading", {
      name: "React AutoComplete",
    });
    const autocomplete = screen.getByRole("combobox", {
      name: "Search your photos here...eg: accus..",
    });
    const closeButton = screen.getByRole("button");

    expect(title).toBeInTheDocument();
    expect(autocomplete).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it("should render the dropdown based on matching search text", async () => {
    (fetch as FetchMock).mockResponse(
      JSON.stringify([
        {
          id: 1,
          title: "this is a matching search",
          url: "http://xyz.com",
        },
      ])
    );

    render(<App />);

    const autocomplete = screen.getByRole("combobox", {
      name: "Search your photos here...eg: accus..",
    });
    fireEvent.change(autocomplete, { target: { value: "this is" } });

    const list = await screen.findByRole("menu");
    expect(list).toBeInTheDocument();

    await waitFor(() => {
      expect(within(list).getByRole("menuitem")).toHaveTextContent(
        "Loading..."
      );
    });

    await waitFor(() => {
      expect(within(list).getByRole("menuitem")).toHaveTextContent(
        "this is a matching searc"
      );
    });
  });

  it("should render no results found if no matching text is entered", async () => {
    (fetch as FetchMock).mockResponse(
      JSON.stringify([
        {
          id: 1,
          title: "this is a matching search",
          url: "http://xyz.com",
        },
        {
          id: 2,
          title: "this is a matching search two",
          url: "http://xyz.com",
        },
      ])
    );

    render(<App />);

    const autocomplete = screen.getByRole("combobox", {
      name: "Search your photos here...eg: accus..",
    });
    fireEvent.change(autocomplete, {
      target: { value: "not a matching text" },
    });

    const list = await screen.findByRole("menu");
    expect(list).toBeInTheDocument();

    await waitFor(() => {
      expect(within(list).getByRole("menuitem")).toHaveTextContent(
        "No results found"
      );
    });
  });

  it("should close the dropdown after clicking the close icon", async () => {
    (fetch as FetchMock).mockResponse(
      JSON.stringify([
        {
          id: 1,
          title: "this is a matching search",
          url: "http://xyz.com",
        },
        {
          id: 2,
          title: "this is a matching search two",
          url: "http://xyz.com",
        },
      ])
    );

    render(<App />);

    const autocomplete = screen.getByRole("combobox", {
      name: "Search your photos here...eg: accus..",
    });
    const closeButton = screen.getByRole("button");
    fireEvent.change(autocomplete, { target: { value: "this is" } });

    const list = await screen.findByRole("menu");
    expect(list).toBeInTheDocument();

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(list).not.toBeInTheDocument();
    });
  });

  it("should hightlight the text inside the dropdown", async () => {
    (fetch as FetchMock).mockResponse(
      JSON.stringify([
        {
          id: 1,
          title: "this is a matching search",
          url: "http://xyz.com",
        },
        {
          id: 2,
          title: "To be not to be",
          url: "http://xyz.com",
        },
      ])
    );

    render(<App />);

    const autocomplete = screen.getByRole("combobox", {
      name: "Search your photos here...eg: accus..",
    });
    fireEvent.change(autocomplete, { target: { value: "this is" } });

    const list = await screen.findByRole("menu");
    expect(list).toBeInTheDocument();

    await waitFor(() => {
      expect(within(list).getByRole("emphasis")).toHaveTextContent("this is");
    });
  });
});
