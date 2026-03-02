import java.util.*;

class Node {
    int data;
    Node next;

    // Constructor
    Node(int ele) {
        data = ele;
        next = null;
    }
}

class LinkedList {
    Node head = null;
    Node tail = null;
    boolean loopCreated = false; // prevents infinite traversal

    // Insert node at end
    void insert(int ele) {
        Node nw = new Node(ele);
        if (head == null) {
            head = nw;
            tail = nw;
        } else {
            tail.next = nw;
            tail = nw;
        }
    }

    // Check if element exists (ONLY before loop is created)
    Node check(int ele) {
        Node temp = head;
        while (temp != null) {
            if (temp.data == ele) {
                return temp;
            }
            temp = temp.next;
        }
        return null;
    }

    // Insert or create loop on duplicate
    void find(int ele) {
        if (loopCreated) return; // stop further operations after loop

        Node existing = check(ele);

        if (existing != null) {
            tail.next = existing;  // create loop
            loopCreated = true;
        } else {
            insert(ele);
        }
    }

    // Floyd’s Cycle Detection Algorithm
    boolean detectLoop() {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true; // loop detected
            }
        }
        return false; // no loop
    }

    // Display list (only if no loop)
    void display() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " ");
            temp = temp.next;
        }
        System.out.println();
    }
}

public class loop_detection {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        LinkedList ll = new LinkedList();

        // Input until -1
        while (true) {
            int elem = sc.nextInt();
            if (elem == -1)
                break;

            ll.find(elem);
        }

        // Loop detection
        if (ll.detectLoop()) {
            System.out.println("Loop detected");
        } else {
            System.out.println("No loop detected");
            ll.display();
        }
    }
}
