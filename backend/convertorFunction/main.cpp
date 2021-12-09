#include <pybind11/pybind11.h>
#include <bits/stdc++.h>

namespace py = pybind11;
using namespace std;

// A class that will store the index of the line and the
// number of pounds symbol "#" at the begining of the line
class IndexPoundPair
{
public:
    int index;
    int pound;

    IndexPoundPair(int index, int pound)
    {
        this->index = index;
        this->pound = pound;
    }
};

// This class basically stores the data that a node of flowchart
// will have when displayed on the website
class Node
{
public:
    int pounds;             // number of "#" (used to determine the position of this node in hierarchy)
    bool root;              // if this node is root (has one "#" sign)
    bool leave;             // if this node has no further children
    std::string text;       // The content that will be displayed on the node
    std::string content;    // Content of accordian
    std::string class_name; // Side of this node with respect to it's siblings (used in styling)
    vector<int> children;   // Index of childrens of this node
    Node(int pounds, string text)
    {
        this->pounds = pounds;
        this->root = false;
        this->leave = false;
        this->text = text;
        this->children = {};
    }
};

// Removes spaces from the begining of the sentance
// argument = "   Hello!  "
// returns = "Hello!  "
string
strip_preceeding_spaces(string line)
{
    int i = 0;
    // find the index of first non white space char
    for (char ch : line)
    {
        if (ch != ' ')
        {
            break;
        }
        i++;
    }
    // return the substring starting from that index
    return line.substr(i);
}

// Returns the number of pound in a word
// argument = "####"
// returns = 4
int get_num_of_pound(string first_word)
{
    int num_of_pound = 0;
    for (char ch : first_word)
    {
        // return 0 when encountering non pound char
        if (ch != '#')
        {
            return 0;
        }
        num_of_pound++;
    }
    return num_of_pound;
}

// Gives classname to the children of a node
// argument = reference to a vector of nodes
void set_class_name(vector<Node> &node_vec)
{
    for (int i = 0; i < node_vec.size(); i++)
    {
        Node node = node_vec[i];              // get the node
        vector<int> children = node.children; // get it's children
        int children_size = children.size();
        if (children_size == 0)
        {
            // node is leave if it has no children
            node_vec[i].leave = true;
        }
        else if (children_size == 1)
        {
            // If only one children give the children class_name of center
            node_vec[children[0]].class_name = "center";
        }
        else if (children_size == 2)
        {
            // if two children give the first children class_name of left-center and other right
            node_vec[children[0]].class_name = "left-center";
            node_vec[children[1]].class_name = "right";
        }
        else
        {
            // if more than two children; first one gets class_name of left and last one gets right
            node_vec[children[0]].class_name = "left";
            node_vec[children[children_size - 1]].class_name = "right";
        }
    }
}

// add escape character and quotes to the passed string
// argument = Hello
// returns = \"Hello\"
string add_quotes(string str)
{
    return "\"" + str + "\"";
}

// add braces around the passed string
// argument = Hello
// returns = {Hello}
string add_braces(string str)
{
    return "{" + str + "}";
}

// Generate opening tag of our react component
// argument = Node
// returns = <Node text="Hello" content="Hello" position="center" leave={true} root={false}>
string generate_opening_tag(Node node)
{
    string root = node.root ? "true" : "false";
    string leave = node.leave ? "true" : "false";
    string text = node.text;
    string content = node.content;
    string class_name = node.class_name;
    string jsx = "<Node text=" + add_quotes(text) + " content=" + add_quotes(content) + " position=" + add_quotes(class_name) + " leave=" + add_braces(leave) + " root=" + add_braces(root) + " >\n";
    return jsx;
}

// Generate the whole JSX string to be used for rendering
// argument = vector of nodes
// returns = JSX string of all the nodes
string get_JSX_string(vector<Node> &node_vec)
{
    string jsx = "";
    stack<int> pound_stack; // stack to hold the number of pounds
    for (Node node : node_vec)
    {
        // while the number of # in the current node is less than or equal to the number of #
        // in top of the stack (the nodes coming before it) than this means that tha current
        // node is at a higher hierarichal level than those node. So we ought to put closing tag
        // for those nodes
        while (!pound_stack.empty() && node.pounds <= pound_stack.top())
        {
            jsx += "</Node>\n";
            pound_stack.pop();
        }
        // the top of the stack has less # than current node means this node is child of the
        // node at the top of stack. Hence adding it's opening tag here
        jsx += generate_opening_tag(node);
        // pushing the number of pounds of current node in the stack
        pound_stack.push(node.pounds);
    }
    // Once all the nodes has been dealt with adding closing tag to all the components
    // without closing tag
    while (!pound_stack.empty())
    {
        jsx += "</Node>\n";
        pound_stack.pop();
    }
    return jsx;
}

// Converts the string passed by user to a string that can be rendered by React
// argument = a normal string
// returns = JSX string
string convert_to_JSX_string(string TEXT)
{
    vector<Node> node_vec;
    stack<IndexPoundPair> index_pound_stack;
    stringstream ss(TEXT);
    string line;
    string content = ""; // variable to put the extra detail for a node

    // getting a single line at a time and putting it in a variable called "line"
    while (getline(ss, line, '\n'))
    {
        string processed_line = strip_preceeding_spaces(line); // stripped of starting white spaces
        if (processed_line.size())
        {
            // getting the first word from modified line
            int first_space = processed_line.find(' ');
            string first_word = processed_line.substr(0, first_space);
            // getting number of # from the first word
            int num_of_pounds = get_num_of_pound(first_word);
            // If the line does not have any #. It is content of a node
            if (num_of_pounds == 0)
            {
                content += processed_line + "\n";
            }
            else
            {
                // if it has #. Everything after the first_space is text of a new Node
                string text = processed_line.substr(first_space + 1);

                // create a new Node with num_of_pounds and text
                Node newNode(num_of_pounds, text);

                // All the non # begining line above this line (stored in variable content)
                // will be content for node before this newNode (node at the end of node_ve)
                if (node_vec.size() != 0)
                {
                    node_vec[node_vec.size() - 1].content = content;
                }

                // now we are trying to find the parent of this newNode
                // pop all the indexes who have more or same pound than newNode
                // as they can not be parent of new node
                while (!index_pound_stack.empty() && index_pound_stack.top().pound >= num_of_pounds)
                {
                    index_pound_stack.pop();
                }

                // if the stack gets empty this node is root since it has no parents
                if (index_pound_stack.empty())
                {
                    newNode.root = true;
                }

                // adding this new node to node_vec
                node_vec.push_back(newNode);

                // if the stack is not empty then the node at the top of stack is parent of newNode
                // get the index of parent (index_pound_stack.top().index)
                // get the parent node (node_vec[index_pound_stack.top().index])
                // get the index of newNode (node_vec.size() - 1) (it is the last element of vector)
                // add the index of this node to the children of parent
                if (!index_pound_stack.empty())
                {
                    node_vec[index_pound_stack.top().index].children.push_back(node_vec.size() - 1);
                }
                // create IndexPoundPair for this new node
                IndexPoundPair ind_pound_pair(node_vec.size() - 1, num_of_pounds);

                // add it to the stack
                index_pound_stack.push(ind_pound_pair);

                // set the content to ""
                content = "";
            }
        }
    }

    // if there are nodes just return empty string
    if (node_vec.size() == 0)
    {
        return " ";
    }

    // All the left content will be content of last node
    node_vec[node_vec.size() - 1].content = content;
    set_class_name(node_vec);
    string JSX = get_JSX_string(node_vec);
    return JSX;
}

PYBIND11_MODULE(string_to_JSX, handle)
{
    handle.doc() = "This module is used to convert a normal string to a JSX string suitable for creating flow charts";
    handle.def("convert_to_JSX_string", &convert_to_JSX_string);
}