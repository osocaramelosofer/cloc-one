import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
  } from "@heroui/react";
  import { MOCK_ORGANIZATIONS } from "../mock-organizations";
  import { Archive, ChevronDown, EllipsisVertical, EyeClosed, EyeIcon, Plus, Search } from "lucide-react";
  import { useState } from "react";
  
  // Constants
  const columns = [
    { name: "ORGANIZATION", uid: "organizacion" },
    { name: "USER COUNT", uid: "userCount" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
  
  const INITIAL_VISIBLE_COLUMNS = ["organizacion", "userCount", "status", "actions"];
  
  const statusColorMap = {
    active: "success",
    inactive: "danger",
  } as const;
  
  const organizations = MOCK_ORGANIZATIONS.organizations
    .slice(0, 30)
    .map((org, index) => ({
      id: index + 1,
      organizacion: org.organizacion,
      userCount: org.userCount,
      status: org.userCount > 0 ? "active" : "inactive",
    }));
  
  function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
  }
  
  export default function OrganizationsTable() {
    const [filterValue, setFilterValue] = useState("");
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
  
    // Filter organizations by search
    const filteredItems = filterValue
      ? organizations.filter((org) =>
          org.organizacion.toLowerCase().includes(filterValue.toLowerCase())
        )
      : organizations;
  
    // Pagination
    const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;
    const start = (page - 1) * rowsPerPage;
    const paginatedItems = filteredItems.slice(start, start + rowsPerPage);
  
    // Columns to display
    const headerColumns =
      visibleColumns === "all"
        ? columns
        : columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  
    // Render cell content
    function renderCell(organization: typeof organizations[0], columnKey: string) {
      const cellValue = organization[columnKey as keyof typeof organization];
  
      switch (columnKey) {
        case "organizacion":
          return (
            <div className="flex flex-col max-w-[250px]">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "userCount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">{cellValue}</p>
              <p className="text-tiny text-default-400">
                {cellValue === 1 ? "user" : "users"}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[organization.status as keyof typeof statusColorMap]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown className="bg-foreground-100">
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <EllipsisVertical className="w-4 h-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key="view" className="flex items-center">
                    <div className="flex items-center gap-2">
                      <EyeIcon size={16} />
                      <span>Ver organización</span>
                    </div>
                  </DropdownItem>
                  <DropdownItem key="archive" color="danger" className="flex items-center">
                    <div className="flex items-center gap-2">
                      <Archive size={16}  />
                      <span>Archivar organización</span>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    }
  
    // Event handlers
    function handleSearchChange(value?: string) {
      setFilterValue(value || "");
      setPage(1);
    }
  
    function handleRowsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    }
  
    function handlePreviousPage() {
      if (page > 1) setPage(page - 1);
    }
  
    function handleNextPage() {
      if (page < pages) setPage(page + 1);
    }
  
    return (
      <Table
        isHeaderSticky
        aria-label="Organizations table with pagination"
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[600px]",
        }}
        topContentPlacement="inside"
        topContent={
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by organization name..."
                startContent={<Search className="w-4 h-4" />}
                value={filterValue}
                onClear={() => handleSearchChange("")}
                onValueChange={handleSearchChange}
              />
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<ChevronDown className="w-4 h-4" />} variant="flat">
                      Columns
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                  >
                    {columns.map((column) => (
                      <DropdownItem key={column.uid} className="capitalize">
                        {capitalize(column.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Button color="primary" endContent={<Plus className="w-4 h-4" />}>
                  Add New
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">
                Total {organizations.length} organizaciones
              </span>
              <label className="flex items-center text-default-400 text-small gap-2">
                Filas por página:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </label>
            </div>
          </div>
        }
        bottomContent={
          <div className="py-2 px-2 flex justify-between items-center">
            <span className="w-[30%] text-small text-default-400">
              {filteredItems.length > 0 &&
                `Mostrando ${start + 1}-${Math.min(start + rowsPerPage, filteredItems.length)} of ${filteredItems.length}`}
            </span>
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button
                isDisabled={page === 1}
                size="sm"
                variant="flat"
                onPress={handlePreviousPage}
              >
                Previous
              </Button>
              <Button
                isDisabled={page === pages}
                size="sm"
                variant="flat"
                onPress={handleNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        }
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "end" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No organizations found" items={paginatedItems}>
          {(item) => (
            <TableRow key={item.id} className="hover:bg-default-100">
              {(columnKey) => <TableCell>{renderCell(item, String(columnKey))}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }