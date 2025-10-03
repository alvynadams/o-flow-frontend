import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Upload } from "lucide-react";

export const DocumentsPage = () => {
  const documents = [
    {
      id: 1,
      title: 'Employee Handbook 2024',
      category: 'HR Policies',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      type: 'PDF',
    },
    {
      id: 2,
      title: 'Expense Report Template',
      category: 'Finance',
      uploadDate: '2024-01-10',
      size: '156 KB',
      type: 'XLSX',
    },
    {
      id: 3,
      title: 'Holiday Calendar 2024',
      category: 'General',
      uploadDate: '2024-01-05',
      size: '89 KB',
      type: 'PDF',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Document Management</h1>
          <p className="text-muted-foreground">Upload, organize, and share company documents</p>
        </div>
        <Button className="bg-violet hover:bg-violet/90">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Add a new document to the library</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Document title" />
            <Input type="file" />
            <Button className="w-full bg-violet hover:bg-violet/90">Upload</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>Browse and manage company documents</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-muted-foreground">{doc.type}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.category}</Badge>
                    </TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
