import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';

interface Person {
  name: string;
  group: string;
}

interface DataFile {
  people: Person[];
  assignments: Record<string, string>;
}

@Injectable()
export class DrawService {
  private filePath = 'src/draw/names.json';

  private loadData(): DataFile {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
  }

  private saveData(data: DataFile) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  private shuffle<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  private isValidMatch(giver: Person, receiver: Person): boolean {
    if (giver.name === receiver.name) return false;
    if (giver.group === receiver.group) return false;
    return true;
  }

  private generateAssignments(people: Person[]): Record<string, string> {
    const givers = this.shuffle([...people]);
    const receivers = [...people];

    const assignments: Record<string, string> = {};

    const backtrack = (index: number): boolean => {
      if (index === givers.length) return true;

      const giver = givers[index];

      const options = this.shuffle(
        receivers.filter(
          (r) =>
            !Object.values(assignments).includes(r.name) &&
            this.isValidMatch(giver, r),
        ),
      );

      for (const receiver of options) {
        assignments[giver.name] = receiver.name;

        if (backtrack(index + 1)) return true;

        delete assignments[giver.name];
      }

      return false;
    };

    for (let i = 0; i < 50; i++) {
      if (backtrack(0)) return assignments;
    }

    throw new BadRequestException(
      'Non è stato possibile generare un match valido. Controlla i gruppi!',
    );
  }

  generateAll() {
    const data = this.loadData();

    const assignments = this.generateAssignments(data.people);

    data.assignments = assignments;
    this.saveData(data);

    return assignments;
  }

  getMyMatch(name: string) {
    const data = this.loadData();

    if (!data.assignments[name]) {
      throw new BadRequestException('Match non generato o nome errato.');
    }

    return {
      target: data.assignments[name],
    };
  }

  allName() {
    const data = this.loadData();
    return data.people.map((p) => p.name);
  }
}
