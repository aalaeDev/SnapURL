import { Popover } from "@radix-ui/themes";
import ChevronDown from "./Icons/ChevronDown";
import { api } from "~/utils/api";
import React from "react";
import Loader from "./Icons/Loader";
import { cutString } from "~/utils/cutString";

interface AliasPopoverProps {
  updateAlias: (value: string) => void;
  defaultAlias: string;
}

export default function AliasPopover({
  updateAlias,
  defaultAlias,
}: AliasPopoverProps) {
  const [alias, setAlias] = React.useState<string>(defaultAlias);
  const [validAlias, setValidAlias] = React.useState<string>(defaultAlias);
  const [isValid, setIsValid] = React.useState<boolean>(true);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { refetch, isFetching } = api.url.getByUrlCode.useQuery(
    { urlCode: encodeURIComponent(alias) },
    { enabled: false }
  );

  function closePopover() {
    setIsOpen(false);
  }

  async function changeAlias() {
    if (!alias) return;

    const { data: url } = await refetch();

    if (url) {
      setIsValid(false);
      updateAlias("");
      setValidAlias("");
      return;
    }

    updateAlias(alias);
    setValidAlias(alias);
    setIsValid(true);
    setIsOpen(false);
  }

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={() => !isOpen && setAlias(defaultAlias)}
    >
      <Popover.Trigger>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-1 rounded-md border border-neutral-600 bg-neutral-600 bg-opacity-20 px-3 py-2 text-neutral-200 duration-200 hover:bg-opacity-60"
        >
          alias
          {validAlias && ": "}
          <span className="font-medium">
            {validAlias ? cutString(validAlias, 8) : ""}
          </span>
          <ChevronDown />
        </button>
      </Popover.Trigger>

      <Popover.Content
        onEscapeKeyDown={closePopover}
        onPointerDownOutside={closePopover}
        onFocusOutside={closePopover}
        onInteractOutside={closePopover}
        style={{
          width: 290,
          background: "#100F1C",
          border: "1px solid #262347",
          boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.25)",
          //   outline: "none",
        }}
        className="p-0 shadow-lg"
      >
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="mb-1 font-semibold text-neutral-100">Alias</h1>
            <p className="text-sm text-neutral-200">
              Set the alias to create your own custom link code.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="alias" className="text-sm">
              Alias
            </label>
            <input
              value={alias}
              onChange={(e) => {
                setAlias(e.target.value);
                if (!isValid) setIsValid(true);
              }}
              type="text"
              name="alias"
              className={`w-full rounded-md border ${
                isValid
                  ? "border-neutral-600 bg-transparent"
                  : "border-danger bg-danger bg-opacity-20"
              } px-3 py-2 text-sm text-neutral-100 outline-none duration-200 focus:border-neutral-200`}
            />
          </div>
          <span className="-my-2 text-xs text-danger">
            {isValid ? "" : "This alias is already used."}
          </span>

          <button
            onClick={() => void changeAlias()}
            className="flex h-8 w-12 items-center justify-center self-end rounded-md bg-neutral-100 text-sm text-neutral-900 duration-200 hover:bg-opacity-95 hover:shadow-lg hover:shadow-neutral-400"
          >
            {isFetching ? <Loader className="h-4 w-4" /> : "Set"}
          </button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
