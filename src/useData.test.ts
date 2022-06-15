import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import useData from "./useData";

const path = "data/123";
const data = { foo: 42 };

const server = setupServer(
  rest.get("http://localhost:4730/*", (req, res, ctx) => res(ctx.json(data)))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("returns null when API call fails", async () => {
  server.use(
    rest.get("http://localhost:4730/*", (req, res, ctx) => res(ctx.status(500)))
  );

  const { result } = renderHook(() => useData(path));

  await waitFor(() => {
    expect(result.current).toStrictEqual({
      data: null,
      reload: expect.any(Function),
    });
  });
});

test("returns the data retrieved from the API call", async () => {
  const { result } = renderHook(() => useData(path));

  await waitFor(() => {
    expect(result.current).toStrictEqual({
      data,
      reload: expect.any(Function),
    });
  });
});
