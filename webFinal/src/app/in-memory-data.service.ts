import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', name: 'Mr. Nice' , subtitle: 'Mega Villain', content: 'Unlike the name, the worst super villain of all. Ruthless and cruel.'},
      { id: 12, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', name: 'Narco' , subtitle: 'Favorite is Coke', content: 'Narcicist hero. No equal.'},
      { id: 13, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', name: 'Bombasto' , subtitle: 'Blows your mind', content: 'Master bomb designer. Mechanic. Favorite is C4'},
      { id: 14, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', name: 'Celeritas', subtitle: 'Espanol', content: 'Gains power from the stars. Power of Flight and burst of energy' },
      { id: 15, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', name: 'Magneta', subtitle: 'Master of dating', content: 'Power of magnetism. Pull and push objects.' },
      { id: 16, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', name: 'RubberMan' , subtitle: 'Slick as heck', content: 'Cannot be physically harmed and stretches well. Weak to heat and sharp objects'},
      { id: 17, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', name: 'Dynama' , subtitle: 'Gone with the wind', content: 'Fastest being alive. Can jump through air'},
      { id: 18, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', name: 'Dr IQ', subtitle: 'Highest Intelligence', content: 'Master tactician. Can forsee 100 moves ahead of his opponent.' },
      { id: 19, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', name: 'Magma' , subtitle: 'Loves Barbeque', content: 'Can turn into magma, control magma, and can heat up objects. Strong when near a volcano'},
      { id: 20, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg', name: 'Tornado' , subtitle: 'Hi', content: 'Creates and controls tornadoes.'}
    ];
    return {heroes};
  }
}