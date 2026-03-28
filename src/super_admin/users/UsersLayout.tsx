"use client";
import UsersTable from "@/src/admin/users/UsersTable"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import FilterSearch from "@/components/common/filter/FIlterSearch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReadersTable from "./ReadersTable";
function UsersLayout() {
    const search = {
        placeholder: "Search",
        value: "",
        onChange: (value: string) => {
            console.log(value);
        },
    };
    const selects = [
        {
            placeholder: "Select",
            options: ["Option 1", "Option 2", "Option 3"],
            value: "",
            onValueChange: (value: string) => {
                console.log(value);
            },
        },
    ];
    return (
        <div className="space-y-4">
            <SmallPageInfo title="Users" description="Manage your users" />
            <FilterSearch search={search} selects={selects} />

            <Tabs defaultValue="readers">
                <TabsList className="bg-linear-to-r from-violet-500 to-indigo-500 w-fit"    >
                    <TabsTrigger value="readers" className="text-gray-100 data-active:bg-linear-to-r from-green-500 to-lime-500">Readers</TabsTrigger>
                    <TabsTrigger value="book-authors" className="text-gray-100 data-active:bg-linear-to-r from-yellow-500 to-orange-500">Book Authors</TabsTrigger>

                </TabsList>
                <TabsContent value="readers">
                    <ReadersTable />
                </TabsContent>
                <TabsContent value="book-authors">
                    <UsersTable />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default UsersLayout;